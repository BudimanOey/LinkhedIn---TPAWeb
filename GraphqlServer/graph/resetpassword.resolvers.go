package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/BudimanOey/tpa-web-server/service"
	"github.com/google/uuid"
)

// GenerateResetPassLink is the resolver for the generateResetPassLink field.
func (r *mutationResolver) GenerateResetPassLink(ctx context.Context, userID string, email string) (string, error) {
	link := &model.ResetPassLink{
		ID:     uuid.NewString(),
		UserID: userID,
	}

	if err := r.DB.Model(link).Create(link).Error; err != nil {
		return "err", err
	}

	service.SendEmail(email, "Reset Password Link", "Here is the link for LinkhedIn password recovery : http://127.0.0.1:5173/resetpass/"+link.ID)

	return link.ID, nil
}

// GetResetPassLink is the resolver for the getResetPassLink field.
func (r *queryResolver) GetResetPassLink(ctx context.Context, id string) (*model.ResetPassLink, error) {
	var link *model.ResetPassLink
	return link, r.DB.First(&link, "ID = ?", id).Error
}
