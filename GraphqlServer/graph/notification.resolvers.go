package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"time"

	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/google/uuid"
)

// AddNotification is the resolver for the addNotification field.
func (r *mutationResolver) AddNotification(ctx context.Context, userID string, toUser string, information string) (string, error) {
	modelNotification := &model.Notification{
		ID:        uuid.NewString(),
		FromUser:  userID,
		ToUser:    toUser,
		Message:   information,
		CreatedAt: time.Now(),
	}

	return "Success Create", r.DB.Create(modelNotification).Error
}

// GetNotifications is the resolver for the getNotifications field.
func (r *queryResolver) GetNotifications(ctx context.Context, userID string) ([]*model.Notification, error) {
	var modelNotifications []*model.Notification

	if err := r.DB.Order("created_at desc").Find(&modelNotifications, "to_user = ?", userID).Error; err != nil {
		return nil, err
	}
	return modelNotifications, nil
}
