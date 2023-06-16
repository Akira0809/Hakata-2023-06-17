package pkg

import (
	"bytes"
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

type Tests struct {
	ID     int    `json:"id"`
	Answer string `json:"answer"`
}

func (h *MyHandler) LlamaChat(w http.ResponseWriter, r *http.Request) {
	var requestPayload RequestPayload

	// Parse request body
	err := json.NewDecoder(r.Body).Decode(&requestPayload)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}

	// Encode payload to json
	payloadBytes, err := json.Marshal(requestPayload)
	if err != nil {
		http.Error(w, "Error encoding payload", http.StatusInternalServerError)
		return
	}

	// Forward the request to Python API
	resp, err := http.Post(h.Python_url, "application/json", bytes.NewReader(payloadBytes))
	if err != nil {
		http.Error(w, "Error from Python API", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	// Set headers
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	buf := make([]byte, 1024)
	test := Tests{ID: 1234}

	for {
		n, err := resp.Body.Read(buf)
		if err != nil && err != io.EOF {
			http.Error(w, "Error reading from Python API", http.StatusInternalServerError)
			return
		}
		if n == 0 {
			break
		}

		test.Answer = string(buf[:n]) // convert the bytes into a string

		// encode and write the Tests struct as a response
		if err := json.NewEncoder(w).Encode(test); err != nil {
			http.Error(w, "Error encoding response", http.StatusInternalServerError)
			return
		}

		// Flush the response writer
		if flusher, ok := w.(http.Flusher); ok {
			flusher.Flush()
		}
	}
}

func Flush(w http.ResponseWriter, r *http.Request) {
	for i := 0; i < 5; i++ {
		w.Write([]byte("hello\n" + strconv.Itoa(i)))
		w.(http.Flusher).Flush()
		time.Sleep(1 * time.Second)
	}

	fmt.Fprintf(w, "hello end\n")
}
