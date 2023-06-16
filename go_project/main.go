package main

import (
	"fmt"
	"hakata0617/internal/pkg"
	"net/http"
	"os"

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
