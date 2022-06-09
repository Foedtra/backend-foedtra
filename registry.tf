resource "google_project_service" "service" {
 for_each = toset([
  "artifactregistry.googleapis.com"
 ])
 service = each.key
 
 project = _PROJECT_NAME
 disable_on_destroy = false
}

resource "google_artifact_registry_repository" "backend-foedtra" {
 provider = google-beta
 location = _REGION
 repository_id = "backend-foedtra"
 format = "DOCKER"
 depends_on = [google_project_service.service["artifactregistry.googleapis.com"]]
}