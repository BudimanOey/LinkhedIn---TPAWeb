package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"

	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/google/uuid"
)

// CreateJob is the resolver for the createJob field.
func (r *mutationResolver) CreateJob(ctx context.Context, input model.NewJob) (string, error) {
	job := &model.Job{
		ID:        uuid.NewString(),
		Title:     input.Title,
		Company:   input.Company,
		Location:  input.Location,
		CreatedAt: input.CreatedAt,
	}
	err := r.DB.Model(job).Create(job).Error
	return "success create job", err
}

// GetJobs is the resolver for the getJobs field.
func (r *queryResolver) GetJobs(ctx context.Context) ([]*model.Job, error) {
	var jobs []*model.Job
	err := r.DB.Model(jobs).Find(&jobs).Error
	return jobs, err
}
