package pkg

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

type MyHandler struct {
	Python_url string
}

func Handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World")
}

func GetAPI(w http.ResponseWriter, r *http.Request) {
	log.Println("ゲットできた")                  // ログを出力
	fmt.Fprintf(w, "Get request received") // 応答メッセージ
}

func (h *MyHandler) Llama_chat(w http.ResponseWriter, r *http.Request) {
	// separate handler and create class for url
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
