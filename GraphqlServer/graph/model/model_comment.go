package model

import (
	"github.com/lib/pq"
	"time"
)

type Comment struct {
	ID      string   `json:"id"`
	Content string   `json:"content"`
	CommentOfPost string `json:"commentOfPost"`
	LikedBy pq.StringArray `json:"likedBy" gorm:"type:text[]"`
	ReplyOfComment string `json:"replyOfComment"`
	CreatedAt time.Time `json:"createdAt"`
	CommentedBy string `json:"commentedBy"`
}

type NewComment struct {
	Content string `json:"content"`
	CommentOfPost string `json:"commentOfPost"`
	CommentedBy string `json:"commentedBy"`
	ReplyOfComment string `json:"replyOfComment"`
}