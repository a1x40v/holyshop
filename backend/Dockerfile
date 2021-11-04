
# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY ./API/*.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . .
RUN dotnet publish ./API -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:5.0
RUN apt-get update
RUN apt install -y netcat

WORKDIR /app
COPY --from=build-env /app/out .
COPY ./wait-for .

CMD ["dotnet", "API.dll"]