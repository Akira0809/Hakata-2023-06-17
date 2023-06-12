package main

import (
	"fmt"
	"io"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World")
}

func getAPI(w http.ResponseWriter, r *http.Request) {
	log.Println("ゲットできた")                  // ログを出力
	fmt.Fprintf(w, "Get request received") // 応答メッセージ
}
func stream(w http.ResponseWriter, r *http.Request) {
	PATH := "http://localhost:5000/llama_chat"
	resp, err := http.Get(PATH)
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
func main() {
	fmt.Println("Go Test!!")

	http.HandleFunc("/", handler) // ハンドラを登録してウェブページを表示させる

	http.HandleFunc("/get", getAPI)
	http.HandleFunc("/stream", stream)

	http.ListenAndServe(":8080", nil)

}
