resource "google_cloudbuild_trigger" "backend-trigger" {
  provider = google-beta
  name = "backend-foedtra"

  github {
   name = var.github_repository
   owner = var.github_owner
   push {
    branch = var.github_branch
   }
  }

  filename = "cloudbuild.yaml"
}