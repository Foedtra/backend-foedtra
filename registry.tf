resource "google_project_service" "service" {
 for_each = toset([
  "artifactregistry.googleapis.com",
  "run.googleapis.com"
 ])
 service = each.key
 
 project = var.project
 disable_on_destroy = false
}

resource "google_artifact_registry_repository" "backend-foedtra" {
 provider = google-beta
 project = var.project
 location = var.region
 repository_id = "backend-foedtra"
 format = "DOCKER"
 depends_on = [google_project_service.service["artifactregistry.googleapis.com"]]
}