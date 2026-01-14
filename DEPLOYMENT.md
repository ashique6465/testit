# Deployment Guide (Docker + Kubernetes + EKS notes)

This document explains how to prepare and deploy this repository to Kubernetes and AWS EKS. **No cloud credentials or infrastructure will be created by these steps** — they are for operator/manual/CI use.

## Overview

- Backend: FastAPI (listens on PORT 8000)
- Frontend: Next.js (production `next start` via `npm start`, listens on PORT 3000)

Files added:

- `backend/Dockerfile`, `frontend/Dockerfile`
- `.dockerignore` (root), `backend/.dockerignore`, `frontend/.dockerignore`
- `k8s/` manifests (namespace, deployments, services, ingress, secret template)

## Build and push images (example)

Replace `<REGISTRY>` with your container registry (ECR, Docker Hub, etc.).

# Backend

docker build -t <REGISTRY>/api-testing-backend:latest -f backend/Dockerfile ./backend
docker push <REGISTRY>/api-testing-backend:latest

# Frontend

docker build -t <REGISTRY>/api-testing-frontend:latest -f frontend/Dockerfile ./frontend
docker push <REGISTRY>/api-testing-frontend:latest

## Kubernetes - local / cluster apply

1. Create namespace:
   kubectl apply -f k8s/namespace.yaml

2. Create backend secrets (example):
   kubectl create secret generic backend-secrets --namespace api-testing \
    --from-literal=MONGO_URI='mongodb://...' \
    --from-literal=DB_NAME='your_db' \
    --from-literal=JWT_SECRET='a-strong-secret'

3. Replace image placeholders in `k8s/*-deployment.yaml` with your registry images (or use `kubectl set image` after applying).

4. Apply manifests:
   kubectl apply -f k8s/

5. Accessing services:

- Frontend is exposed internally on service `frontend` (port 80 -> targetPort 3000).
- To expose publicly on EKS consider using the `k8s/ingress-alb.yaml` which requires the AWS Load Balancer Controller (ALB) to be installed.

## EKS-specific notes

- Ingress: `k8s/ingress-alb.yaml` uses `kubernetes.io/ingress.class: alb` and `alb.ingress.kubernetes.io/*` annotations — this requires the AWS Load Balancer Controller to be installed and properly configured in your cluster.
- Image registry: use ECR or another registry. For private ECR registries you may need an `imagePullSecret` or use EKS IRSA to allow nodes to pull images via IAM role.
- Secrets: store `MONGO_URI` and `JWT_SECRET` in Kubernetes Secrets or use AWS Secrets Manager with an operator.
- Recommended additions for production: TLS via cert-manager + ACM, external db (Mongo Atlas or managed Mongo), autoscaling and resource limits, logging (CloudWatch/Kubernetes logging), and readiness/liveness tuning.

## Security & best practices

- **Do not** commit credentials or secrets into the repo.
- Use Kubernetes Secrets or a secrets manager.
- Use RBAC, restrict service accounts, and follow least privilege for any AWS IAM roles.

## Next steps / optional improvements

- Add GitHub Actions / GitLab CI pipeline that builds images and deploys to EKS automatically (without committing secrets to the repo).
- Consider migrating the blocking `requests` call in `backend/app/services/runner_service.py` to `httpx.AsyncClient` for non-blocking behavior in an async app.

If you'd like, I can also: generate a sample GitHub Actions workflow for building/pushing images and applying manifests to an EKS cluster using OIDC/IRSA (no credentials in repo).
