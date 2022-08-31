package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/google/uuid"
)

// GenerateActivation is the resolver for the generateActivation field.
func (r *mutationResolver) GenerateActivation(ctx context.Context, userID string) (string, error) {
	invitation := &model.Invitation{
		ID:     uuid.NewString(),
		UserID: userID,
	}

	if err := r.DB.Model(invitation).Create(invitation).Error; err != nil {
		return "error", err
	}

	return invitation.ID, nil
}

// GetActivation is the resolver for the getActivation field.
func (r *queryResolver) GetActivation(ctx context.Context, id string) (*model.Invitation, error) {
	inv := new(model.Invitation)
	return inv, r.DB.First(inv, "ID = ?", id).Error
}
