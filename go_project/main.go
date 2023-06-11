package main

import (
	"fmt"
	"log"
	"net/http"
	"net/http/httputil"
	"time"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, World")
}

func getAPI(w http.ResponseWriter, r *http.Request) {
	log.Println("ゲットできた")                  // ログを出力
	fmt.Fprintf(w, "Get request received") // 応答メッセージ
}
func stream(w http.ResponseWriter, r *http.Request) {
	flusher, _ := w.(http.Flusher)
	cw := httputil.NewChunkedWriter(w)
	for i := 0; i < 3; i++ {
		cw.Write([]byte("hello"))
		flusher.Flush()
		time.Sleep(time.Second)
	}
}

func main() {
	fmt.Println("Go Test!!")

	http.HandleFunc("/", handler) // ハンドラを登録してウェブページを表示させる

	http.HandleFunc("/get", getAPI)
	http.HandleFunc("/stream", stream)

	http.ListenAndServe(":8080", nil)

}
