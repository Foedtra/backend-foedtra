resource "google_artifact_registry_repository" "backend-foedtra" {
 provider = google-beta
 location = var.region
 repository_id = "backend-foedtra"
 format = "DOCKER"
}