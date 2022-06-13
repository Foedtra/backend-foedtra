data "google_project" "project" {
    project_id = var.project
}


resource "google_project_iam_member" "cloudbuild-run" {
    project = var.project
    role    = "roles/run.admin"
    member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

resource "google_project_iam_member" "cloudbuild-iam" {
    project = var.project
    role    = "roles/iam.serviceAccountUser"
    member  = "serviceAccount:${data.google_project.project.number}@cloudbuild.gserviceaccount.com"
}

resource "google_cloudbuild_trigger" "backend-foedtra" {
  provider = google-beta
  name = "backend-foedtra"
  project = var.project

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
    _REGION = var.region
    _PROJECT_NAME = var.project
  }

  filename = "cloudbuild.yaml"
}