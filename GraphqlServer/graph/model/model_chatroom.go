package model

import (
	"time"

)

type ChatRoom struct {
	ID        string         `json:"id"`
	User1     string         `json:"user1"`
	User2     string         `json:"user2"`
	CreatedAt time.Time      `json:"createdAt"`
}