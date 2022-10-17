package model

import "time"

type Message struct {
	ID         string    `json:"id"`
	Sender     string    `json:"sender"`
	RoomID string `json:"roomID"`
	Text       string    `json:"text"`
	ImageURL   string    `json:"imageURL"`
	SharedPost string    `json:"sharedPost"`
	SharedUser string    `json:"sharedUser"`
	CreatedAt  time.Time `json:"createdAt"`
}