#Get the base SDK image from microsoft
FROM mcr.microsoft.com/dotnet/core/sdk:3.1-bionic AS build
WORKDIR /app/api

#Copy the main .csproj and restore its dependencies 
COPY ./api .

RUN ls

#WORKDIR /app
#COPY . .
#WORKDIR /app/api

#RUN dotnet restore TodoAPI.csproj
# Copy everything else and build
#RUN dotnet publish -c Release -o out

#Generate the runtime image 
#FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-bionic
#WORKDIR /app
#EXPOSE 80
#EXPOSE 443
#COPY --from=build /app/api/out .
#ENTRYPOINT ["dotnet", "TodoAPI.dll"]