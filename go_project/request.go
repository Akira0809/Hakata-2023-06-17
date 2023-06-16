package main

// チャットの送信データ
type Request struct {
	Model    string            `json:"model"`
	Messages []*RequestMessage `json:"messages"`

	// 最大トークン
	MaxTokens int `json:"max_tokens"`
}

func NewRequest(modelID string, messages []*RequestMessage, maxTokens int) *Request {
	return &Request{
		Model:     modelID,
		Messages:  messages,
		MaxTokens: maxTokens,
	}
}

// チャットの送信メッセージ
type RequestMessage struct {
	// メッセージの役割(assistant, user, systemのどれか)
	Role string `json:"role"`

	// メッセージの本文
	Content string `json:"content"`
}

func NewRequestMessage(role string, content string) *RequestMessage {
	return &RequestMessage{
		Role:    role,
		Content: content,
	}
}
