package main

// チャットの受信データ
type Response struct {
	ID      string    `json:"id"`
	Object  string    `json:"object"`
	Created int       `json:"created"`
	Model   string    `json:"model"`
	Usage   *Usage    `json:"usage"`
	Choices []*Choice `json:"choices"`
}

// APIの使用量
type Usage struct {
	// 入力データのトークン
	PromptTokens int `json:"prompt_tokens"`

	// 出力データのトークン
	CompletionTokens int `json:"completion_tokens"`

	// 合計トークン
	TotalTokens int `json:"total_tokens"`
}

type Choice struct {
	// 受信メッセージ
	Message *ResponseMessage `json:"message"`

	// リクエストが異常終了した場合の理由(正常終了の場合は空文字)
	FinishReason string `json:"finish_reason"`

	// トークン化されたインデックス
	Index int `json:"index"`
}

// チャットの受信メッセージ
type ResponseMessage struct {
	// メッセージの役割(assistant, user, systemのどれか)
	Role string `json:"role"`

	// メッセージの本文
	Content string `json:"content"`
}
