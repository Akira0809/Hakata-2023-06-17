package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"hakata0617/internal/pkg"
	"io/ioutil"
	"net/http"
	"os"
	"time"

	"github.com/rs/cors"
)

func main() {
	//docker内で動作している場合は、pythonのコンテナ名を指定する
	port := "8080"
	python_url := ""
	if os.Getenv("IS_DOCKER") == "true" {
		python_url = "http://python_project:5000/llama_chat"
	} else {
		python_url = "http://localhost:5000/llama_chat"
	}

	handle := &pkg.MyHandler{Python_url: python_url}

	fmt.Println("server is running on port " + port)
	http.HandleFunc("/", pkg.Handler) // ハンドラを登録してウェブページを表示させる
	http.HandleFunc("/get", pkg.GetAPI)
	http.HandleFunc("/flush", pkg.Flush)

	type ChatGPTRequestBody struct {
		Prefecture string `json:"prefecture"`
		Question   string `json:"question"`
	}

	http.HandleFunc("/chatgpt", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		var requestBody ChatGPTRequestBody
		err := json.NewDecoder(r.Body).Decode(&requestBody)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		fmt.Println(requestBody.Prefecture, requestBody.Question)

		secret := "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"

		// リソース節約のためにタイムアウトを設定する
		timeout := 15 * time.Second

		// トークン節約のために応答の最大トークンを設定する
		maxTokens := 500

		// チャットに使用するモデルのID
		modelID := "gpt-3.5-turbo"

		c := NewChatCompletions(modelID, secret, maxTokens, timeout)
		res, err := c.AskOneQuestion(requestBody.Prefecture, requestBody.Question) // here, pass requestBody directly
		if err != nil {
			fmt.Println(err.Error())
			return
		}

		fmt.Printf("In %d / Out %d / Total %d tokens\n", res.Usage.PromptTokens, res.Usage.CompletionTokens, res.Usage.TotalTokens)
		for _, v := range res.Choices {
			fmt.Printf("[%s]: %s\n", v.Message.Role, v.Message.Content)
		}

		// Assume the assistant's reply is the first choice
		reply := res.Choices[0].Message.Content

		// Send the reply back to the client
		jsonReply, err := json.Marshal(map[string]string{"answer": reply})
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.Write(jsonReply)

	})

	type SerachRequestBody struct {
		Prefecture string `json:"prefecture"`
	}

	http.HandleFunc("/search", func(w http.ResponseWriter, r *http.Request) {

		fmt.Println("すくレイプテスト！！")

		var requestBody SerachRequestBody
		err := json.NewDecoder(r.Body).Decode(&requestBody)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		results, err := Search(requestBody.Prefecture)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		jsonResults, err := json.Marshal(results)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		postURL := "http://localhost:5000/scripe"
		resp, err := http.Post(postURL, "application/json", bytes.NewBuffer(jsonResults))
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		if resp.StatusCode != http.StatusOK {
			http.Error(w, "Failed to POST data", resp.StatusCode)
			return
		}

		responseBody, err := ioutil.ReadAll(resp.Body)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		fmt.Println(requestBody)

		w.Write(responseBody)
	})

	// HandleFuncには関数を直接渡す代わりに、pkg.MyHandlerのメソッドを呼び出す無名関数を渡します。
	http.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
		handle.LlamaChat(w, r)
	})

	// CORS レスポンスヘッダーの追加
	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},                                                // 全てのオリジンを許可
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"}, // 複数のHTTPメソッドを許可
		AllowedHeaders: []string{"*"},                                                // 全てのヘッダーを許可
	})
	handler := c.Handler(http.DefaultServeMux)
	http.ListenAndServe(":"+port, handler)
}
