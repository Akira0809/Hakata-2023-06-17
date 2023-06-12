package main

import (
	"fmt"
	"hakata0617/internal/pkg"
	"net/http"
	"os"
)

func main() {
	//docker内で動作している場合は、pythonのコンテナ名を指定する
	python_url := ""
	if os.Getenv("IS_DOCKER") == "true" {
		python_url = "http://python_project:5000/llama_chat"
	} else {
		python_url = "http://localhost:5000/llama_chat"
	}

	handle := &pkg.MyHandler{Python_url: python_url}

	fmt.Println("Go Test!!")
	http.HandleFunc("/", pkg.Handler) // ハンドラを登録してウェブページを表示させる
	http.HandleFunc("/get", pkg.GetAPI)

	// HandleFuncには関数を直接渡す代わりに、pkg.MyHandlerのメソッドを呼び出す無名関数を渡します。
	http.HandleFunc("/chat", func(w http.ResponseWriter, r *http.Request) {
		handle.Llama_chat(w, r)
	})

	http.ListenAndServe(":8080", nil)
}
