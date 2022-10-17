package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"time"

	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/google/uuid"
)

// AddChatRoom is the resolver for the addChatRoom field.
func (r *mutationResolver) AddChatRoom(ctx context.Context, userID1 string, userID2 string) (string, error) {
	modelRoom := &model.ChatRoom{
		ID:        uuid.NewString(),
		User1:     userID1,
		User2:     userID2,
		CreatedAt: time.Now(),
	}

	return "Success create", r.DB.Create(modelRoom).Error
}

// SendMessage is the resolver for the sendMessage field.
func (r *mutationResolver) SendMessage(ctx context.Context, input model.NewMessage) (string, error) {
	modelMessage := &model.Message{
		ID:         uuid.NewString(),
		RoomID:     input.RoomID,
		Sender:     input.Sender,
		Text:       input.Text,
		ImageURL:   input.ImageURL,
		SharedPost: input.SharedPost,
		SharedUser: input.SharedUser,
		CreatedAt:  time.Now(),
	}

	return "message sent!", r.DB.Create(modelMessage).Error
}

// GetChatRoom is the resolver for the getChatRoom field.
func (r *queryResolver) GetChatRoom(ctx context.Context, roomID string) (*model.ChatRoom, error) {
	modelRoom := new(model.ChatRoom)
	return modelRoom, r.DB.Find(modelRoom, "id = ?", roomID).Error
}

// GetChatRooms is the resolver for the getChatRooms field.
func (r *queryResolver) GetChatRooms(ctx context.Context, userID string) ([]*model.ChatRoom, error) {
	var modelRooms []*model.ChatRoom
	if err := r.DB.Order("created_at desc").Where("user1 = ?", userID).Or("user2 = ?", userID).Find(&modelRooms).Error; err != nil {
		return nil, err
	}
	return modelRooms, nil
}

// GetChatRoomByUsers is the resolver for the getChatRoomByUsers field.
func (r *queryResolver) GetChatRoomByUsers(ctx context.Context, user1 string, user2 string) (*model.ChatRoom, error) {
	var modelRoom *model.ChatRoom
	if err := r.DB.Where("user1 = ? and user2 = ?", user1, user2).Or("user1 = ? and user2 = ?", user2, user1).Find(&modelRoom).Error; err != nil {
		return nil, err
	}
	return modelRoom, nil
}

// GetMessages is the resolver for the getMessages field.
func (r *queryResolver) GetMessages(ctx context.Context, roomID string) ([]*model.Message, error) {
	var modelMessages []*model.Message
	if err := r.DB.Order("created_at asc").Find(&modelMessages, "room_id = ?", roomID).Error; err != nil {
		return nil, err
	}
	return modelMessages, nil
}
