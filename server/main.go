package main

import (
	"fmt"
	"os"
	"server/database"
	"server/pkg/mysql"
	"server/routes"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	godotenv.Load()

	e := echo.New()

	mysql.DatabaseInit()
	database.RunMigration()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	routes.Routeinit(e.Group("/api/v1"))

	var PORT = os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	fmt.Println("Server is running on http://" + ":" + PORT)
	e.Logger.Fatal(e.Start(":" + PORT))
}
