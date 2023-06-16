package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"
)

type Tests struct {
	ID       int    `json:"id"`
	Greeting string `json:"greeting,omitempty"`
}

func handler(w http.ResponseWriter, r *http.Request) {
	// IDを一度だけ設定
	test := Tests{
		ID: 1,
	}
	json.NewEncoder(w).Encode(test)

	// Greetingを繰り返し表示
	for i := 1; i <= 5; i++ {
		test := Tests{
			Greeting: "hello " + strconv.Itoa(i),
		}
		json.NewEncoder(w).Encode(test)
		w.(http.Flusher).Flush()
		time.Sleep(1 * time.Second)
	}

	fmt.Fprintf(w, "hello end\n")
}

func main() {
	http.HandleFunc("/", handler)
	http.ListenAndServe(":8080", nil)
}
