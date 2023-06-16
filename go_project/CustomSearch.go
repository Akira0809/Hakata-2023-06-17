package main

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/url"
)

type GoogleResult struct {
	Items []Item `json:"items"`
}

type Item struct {
	Title string `json:"title"`
	Link  string `json:"link"`
}

const (
	apiKey = "AIzaSyCLfwcLCBViWxYufrPHwOdjsXv9oAPeUz0" // replace with your API Key
	cx     = "565a34d45458a4a2b"                       // replace with your Custom Search Engine ID
)

type Result struct {
	Title string
	URL   string
}

func Search(prefecture string) ([]Result, error) {
	query := prefecture + "イベント"
	customSearchURL := "https://www.googleapis.com/customsearch/v1"

	u, _ := url.Parse(customSearchURL)
	q := u.Query()
	q.Set("key", apiKey)
	q.Set("cx", cx)
	q.Set("q", query)
	u.RawQuery = q.Encode()

	response, err := http.Get(u.String())
	if err != nil {
		return nil, err
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	var result GoogleResult
	err = json.Unmarshal(body, &result)
	if err != nil {
		return nil, err
	}

	var results []Result
	for i, item := range result.Items {
		results = append(results, Result{Title: item.Title, URL: item.Link})
		if i >= 4 { // Limit to top 5 links
			break
		}
	}
	return results, nil
}
