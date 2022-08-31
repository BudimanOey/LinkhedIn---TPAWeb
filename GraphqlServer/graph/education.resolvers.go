package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/google/uuid"
)

// AddEducation is the resolver for the addEducation field.
func (r *mutationResolver) AddEducation(ctx context.Context, input *model.NewEducation) (*model.Education, error) {
	education := &model.Education{
		ID:          uuid.NewString(),
		UserID:      input.UserID,
		School:      input.School,
		Degree:      input.Degree,
		Major:       input.Major,
		Grade:       input.Grade,
		StartDate:   input.StartDate,
		EndDate:     input.EndDate,
		Description: input.Description,
	}

	err := r.DB.Model(education).Create(education).Error

	return education, err
}

// UpdateEducation is the resolver for the updateEducation field.
func (r *mutationResolver) UpdateEducation(ctx context.Context, id string, input *model.NewEducation) (string, error) {
	var education *model.Education
	if err := r.DB.First(&education, "ID = ?", id).Error; err != nil {
		return "Error while getting education", err
	}
	education.School = input.School
	education.Degree = input.Degree
	education.Major = input.Major
	education.StartDate = input.StartDate
	education.Description = input.Description
	education.Grade = input.Grade
	education.EndDate = input.EndDate
	
	return "success", r.DB.Save(education).Error
}

// RemoveEducation is the resolver for the removeEducation field.
func (r *mutationResolver) RemoveEducation(ctx context.Context, id string) (string, error) {
	var education *model.Education
	return "Success", r.DB.Where("ID = ?", id).Delete(&education).Error
}

// GetEducation is the resolver for the getEducation field.
func (r *queryResolver) GetEducation(ctx context.Context, userID string) ([]*model.Education, error) {
	var education []*model.Education
	err := r.DB.Model(education).Where("user_id LIKE ?", userID).Find(&education).Error
	return education, err
}
