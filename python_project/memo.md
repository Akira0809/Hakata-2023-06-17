
http header 

req.Header.Set("Content-Type", "application/json")


docker build -t lakky1/hakata_python_project .
docker push  lakky1/hakata_python_project:latest
docker run --name my-redis --rm -d -p 6379:6379 redis