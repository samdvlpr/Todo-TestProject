#Get the base SDK image from microsoft
FROM mcr.microsoft.com/dotnet/core/sdk:latest AS build
WORKDIR /app

#Copy the main .csproj and restore its dependencies 
COPY *.csproj ./
RUN dotnet restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

#Generate the runtime image 
FROM mcr.microsoft.com/dotnet/core/aspnet:latest
WORKDIR /app
EXPOSE 80
COPY --from=build /app/out .
ENTRYPOINT ["dotnet", "todo.dll"]