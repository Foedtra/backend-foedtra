resource "google_cloudbuild_trigger" "my-trigger" {
  provider = google-beta
  name = "backend-foedtra"

  github {
   name = var.github_repository
   owner = var.github_owner
   push {
    branch = var.github_branch
   }
  }

  substitutions = {
    _REGISTRY = google_artifact_registry_repository.backend-foedtra.repository_id
    _REGISTRY_URL = "${var.region}-docker.pkg.dev"
  }

  filename = "cloudbuild.yaml"
}