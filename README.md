# Microservices Blog Application

This project is a microservices-based blog application where users can create posts, read all posts along with the associated comments, and write comments. The project is built using Docker, Kubernetes (k8s), and Skaffold to streamline development and deployment.

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Overview

This application consists of five distinct microservices:

1. **Posts Service**: Handles creating posts.
2. **Comments Service**: Manages comments associated with posts.
3. **Query Service**: Aggregates data from the posts and comments services.
4. **Moderation Service**: Automatically moderates comments based on predefined criteria.(orange is considered an offensive term)
5. **Event-Bus Service**: Facilitates communication between the microservices by dispatching events.(will handle the case when a service is down for some time and comes back again)

All services are containerized using Docker, orchestrated with Kubernetes, and managed locally with Skaffold.

## Architecture

The architecture is designed around microservices, where each service is responsible for a specific functionality. The event bus acts as a central hub for event-driven communication between the services. The use of Kubernetes ensures scalability and reliability, while Skaffold simplifies the development workflow by automating the build, push, and deploy process.

![Architecture Diagram](./images/Architecture%20Diagram.jpeg)

## Setup Instructions

### Prerequisites

Before running the project, ensure you have the following installed on your local machine:

- [Docker](https://www.docker.com/get-started)
- [Kubernetes](https://kubernetes.io/docs/setup/) (along with Ingress)
- [Skaffold](https://skaffold.dev/docs/install/)

### Cloning the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

## Running the Application

To run the application, follow these steps:

1. **Start Docker Desktop**: Ensure Docker Desktop is running on your machine. This will handle containerization and the Docker daemon.

2. **Set Up Kubernetes**:

   - **Start Kubernetes**: Make sure Kubernetes is running. Docker Desktop provides an integrated Kubernetes cluster that you can enable in its settings.
   - **Install Ingress Controller**: Apply the Ingress controller configuration to your Kubernetes cluster:

     ```bash
     kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.11.2/deploy/static/provider/cloud/deploy.yaml
     ```

3. **Install Skaffold**:

   - Download and install Skaffold from the [Skaffold installation guide](https://skaffold.dev/docs/install/#standalone-binary).

4. **Deploy the Application**:

   - Navigate to your project directory where the `skaffold.yaml` file is located.

     ```bash
     cd path/to/your-repo
     ```

   - Start Skaffold to build and deploy the microservices. Skaffold will watch for changes, rebuild the Docker images, and redeploy them automatically:

     ```bash
     skaffold dev
     ```

5. **Access the Application**:

   - Once the services have started and are listening, you can access the application by opening your browser and navigating to:

     ```
     http://posts.com
     ```

   - Ensure that `posts.com` is mapped to the local address of your Kubernetes Ingress controller. You can do this by adding the following entry to your `/etc/hosts` file (on macOS/Linux) or `C:\Windows\System32\drivers\etc\hosts` file (on Windows):

     ```
     127.0.0.1 posts.com
     ```

   - You should now be able to create posts, view posts and their associated comments, and write new comments.

## Technologies Used

- **Node.js**: Used for developing the backend services.
- **Docker**: Containerization of microservices to ensure consistency across different environments.
- **Kubernetes**: Orchestration and management of containerized services in a cluster.
- **Skaffold**: Development workflow tool that automates the building, pushing, and deploying of Kubernetes applications.
- **Ingress-Nginx**: Manages external access to the services in the Kubernetes cluster, providing HTTP and HTTPS routing.
- **MongoDB**: NoSQL database used for storing posts and comments data.
- **Express**: Web application framework for Node.js used in building the RESTful APIs for the services.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow these steps:

1. **Fork the Repository**: Create a personal copy of the repository by forking it on GitHub.

2. **Clone Your Fork**: Clone your fork to your local machine:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

3. **Create a Branch**: Create a new branch for your changes and switch to it:

```bash
Copy code
git checkout -b feature/your-feature-name
```

4. **Make Your Changes**: Implement your changes. Ensure your code adheres to the project's coding style and includes necessary tests.

5. **Commit Your Changes**: Commit your changes with a descriptive message:

```bash
Copy code
git add .
git commit -m "Brief description of your changes"
```

6. **Push Your Changes**: Push your branch to your forked repository:

```bash
Copy code
git push origin feature/your-feature-name
```

7. **Open a Pull Request**: Go to the original repository on GitHub and open a pull request from your branch. Provide a detailed description of your changes and their purpose.

8. **Address Feedback**: Review any feedback from maintainers and make the necessary adjustments.

If you have any questions or need assistance, please open an issue or contact us directly. We appreciate your contributions!
