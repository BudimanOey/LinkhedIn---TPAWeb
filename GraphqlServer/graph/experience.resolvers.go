package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/google/uuid"
)

// AddExperience is the resolver for the addExperience field.
func (r *mutationResolver) AddExperience(ctx context.Context, input *model.NewExperience) (string, error) {
	experience := &model.Experience{
		ID:               uuid.NewString(),
		UserID:           input.UserID,
		Title:            input.Title,
		EmploymentType:   input.EmploymentType,
		Company:          input.Company,
		Location:         input.Location,
		StartDate:        input.StartDate,
		EndDate:          input.EndDate,
		Description:      input.Description,
		CurrentlyWorking: input.CurrentlyWorking,
	}
	err := r.DB.Model(experience).Create(experience).Error
	return "success add", err
}

// UpdateExperience is the resolver for the updateExperience field.
func (r *mutationResolver) UpdateExperience(ctx context.Context, id string, input *model.NewExperience) (string, error) {
	var exp *model.Experience
	if err := r.DB.First(&exp, "ID = ?", id).Error; err != nil {
		return "Error while getting experience", err
	}

	exp.Title = input.Title
	exp.Company = input.Company
	exp.Location = input.Location
	exp.StartDate = input.StartDate
	exp.Description = input.Description
	exp.EmploymentType = input.EmploymentType
	exp.EndDate = input.EndDate
	exp.CurrentlyWorking = input.CurrentlyWorking

	return "success", r.DB.Save(exp).Error
}

// RemoveExperience is the resolver for the removeExperience field.
func (r *mutationResolver) RemoveExperience(ctx context.Context, id string) (string, error) {
	var experience *model.Experience
	return "Success", r.DB.Where("ID = ?", id).Delete(&experience).Error
}

// GetExperience is the resolver for the getExperience field.
func (r *queryResolver) GetExperience(ctx context.Context, userID string) ([]*model.Experience, error) {
	var experience []*model.Experience
	err := r.DB.Model(experience).Where("user_id LIKE ?", userID).Find(&experience).Error
	return experience, err
}
