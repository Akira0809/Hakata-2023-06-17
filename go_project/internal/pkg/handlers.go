package pkg

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strconv"
	"time"
)

type MyHandler struct {
	Python_url string
}

type RequestPayload struct {
	Prefecture string `json:"prefecture"`
	Question   string `json:"question"`
}

type ResponsePayload struct {
	Answer string `json:"answer"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World")
}

func GetAPI(w http.ResponseWriter, r *http.Request) {
	log.Println("ゲットできた")                  // ログを出力
	fmt.Fprintf(w, "Get request received") // 応答メッセージ
}

func (h *MyHandler) Llama_chat(w http.ResponseWriter, r *http.Request) {
	requestpayload := RequestPayload{}
	// separate handler and create class for url
	err := json.NewDecoder(r.Body).Decode(&requestpayload)
	if err != nil {
		log.Fatal(err)
	}

	// must refact
	resp, err := http.Get(h.Python_url)
	if err != nil {
		http.Error(w, "Error from Python API", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", "text/plain")
	w.WriteHeader(http.StatusOK)

	// Create a buffer to store chunks of the response
	buf := make([]byte, 1024)
	for {
		n, err := resp.Body.Read(buf)
		if err != nil && err != io.EOF {
			http.Error(w, "Error reading from Python API", http.StatusInternalServerError)
			return
		}
		if n == 0 {
			break
		}
		if _, err := w.Write(buf[:n]); err != nil {
			http.Error(w, "Error writing to response", http.StatusInternalServerError)
			return
		}
		// Flush the response writer
		if flusher, ok := w.(http.Flusher); ok {
			flusher.Flush()
		}
	}
}

func Mock(w http.ResponseWriter, r *http.Request) {
	chatjson := RequestPayload{}
	// separate handler and create class for url
	err := json.NewDecoder(r.Body).Decode(&chatjson)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(chatjson.Prefecture)
	ans := ResponsePayload{Answer: "answer"}
	json.NewEncoder(w).Encode(ans)
	w.WriteHeader(http.StatusOK)
}

func Flush(w http.ResponseWriter, r *http.Request) {
	for i := 0; i < 5; i++ {
		w.Write([]byte("hello\n" + strconv.Itoa(i)))
		w.(http.Flusher).Flush()
		time.Sleep(1 * time.Second)
	}

	fmt.Fprintf(w, "hello end\n")

}
