package main

import (
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/BudimanOey/tpa-web-server/graph"
	"github.com/BudimanOey/tpa-web-server/graph/generated"
	"github.com/BudimanOey/tpa-web-server/graph/model"
	"github.com/BudimanOey/tpa-web-server/service/directives"
	"github.com/BudimanOey/tpa-web-server/service/middlewares"
	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const defaultPort = "7070"

func MyCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("content-type", "application/json;charset=UTF-8")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func migrateTable(db *gorm.DB) {
	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.Invitation{})
	db.AutoMigrate(&model.ResetPassLink{})
	db.AutoMigrate(&model.Education{})
	db.AutoMigrate(&model.Experience{})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	dsn := "host=localhost user=postgres password=Cingkotuy215 dbname=tpa-web port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	migrateTable(db)

	c := generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}
	c.Directives.Auth = directives.Auth

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(c))

	router := mux.NewRouter()
	router.Use(MyCors)
	router.Use(middlewares.AuthMiddleware)
	router.Handle("/", playground.Handler("GraphQL playground", "/query"))
	router.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
