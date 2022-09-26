package model

import (
	"github.com/lib/pq"
	"time"
)

type Post struct {
	ID        string    `json:"id"`
	Text      string    `json:"text"`
	PhotoURL  string    `json:"photoURL"`
	VideoURL  string    `json:"videoURL"`
	Creator   string    `json:"creator"`
	LikedBy   pq.StringArray `json:"likedBy" gorm:"type:text[]"`
	CreatedAt time.Time `json:"createdAt"`
}

type NewPost struct {
	Text     string `json:"text"`
	PhotoURL string `json:"photoURL"`
	VideoURL string `json:"videoURL"`
	Creator  string `json:"creator"`
}
