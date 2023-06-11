package main

import (
	"fmt"
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

func main() {
	fmt.Println("Go Test!!")

	http.HandleFunc("/", handler) // ハンドラを登録してウェブページを表示させる

	http.HandleFunc("/get", getAPI)

	http.ListenAndServe(":8080", nil)

}
