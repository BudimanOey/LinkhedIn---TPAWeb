package model

import "github.com/lib/pq"

type User struct {
	ID               string         `json:"id"`
	FirstName        string         `json:"firstName"`
	LastName         string         `json:"lastName"`
	Email            string         `json:"email"`
	Password         string         `json:"password"`
	Activated        bool           `json:"activated"`
	ProfilePicture   string         `json:"profilePicture"`
	BackgroundPicture string `json:"backgroundPicture"`
	ConnectRequest   pq.StringArray `json:"connectRequest" gorm:"type:text[]"`
	RequestConnectTo pq.StringArray `json:"requestConnectTo" gorm:"type:text[]"`
	ConnectedUser    pq.StringArray `json:"connectedUser" gorm:"type:text[]"`
	FollowedUser     pq.StringArray `json:"followedUser" gorm:"type:text[]"`
	BlockedUser      pq.StringArray `json:"blockedUser" gorm:"type:text[]"`
}

type NewUser struct {
	FirstName      string `json:"firstName"`
	LastName       string `json:"lastName"`
	Email          string `json:"email"`
	Password       string `json:"password"`
	ProfilePicture string `json:"profilePicture"`
}
