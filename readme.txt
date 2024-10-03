Overview
This project demonstrates the orchestration of a simulated DDoS attack on a deployed HTTP2 Node.js server. It encompasses various techniques, from network simulation using Docker containers to machine learning for analyzing attack patterns.

Features
Deployed HTTP2 Node.js Server: Set up as the attack target for testing and analysis.
RST STREAM Injection: Crafted a JavaScript script to send RST STREAM commands, effectively resetting connections during the attack.
Network Simulation: Utilized Docker containers to create an isolated network environment for testing various attack scenarios.
Packet Capture: Employed TCPDump to generate PCAP files for subsequent analysis.
Packet Analysis: Leveraged Wireshark to dissect and analyze the network traffic captured during the attack.
Machine Learning Model Training: Trained a model using a dataset generated from the simulated DDoS attack, focusing on various machine learning algorithms.
Algorithms Used:
Decision Tree
Random Forest
Gaussian Naive Bayes
K-Nearest Neighbors
Stochastic Gradient Descent (SGD)
Model Performance: Initially tested on the dataset with accuracies ranging from 68% to 78%.
Incremental Learning: Combined datasets and applied an 80:20 split for training and testing, leading to improved model performance.
Final Accuracy: Achieved a remarkable final accuracy of 98% on the combined dataset.
Usage
To execute the DDoS attack simulation, run the provided JavaScript script within the Docker environment.
Use TCPDump to capture the network traffic:
bash
Copy code
tcpdump -i eth0 -w output.pcap
Analyze the captured PCAP files using Wireshark for insights on the attack patterns.
Machine Learning Model
Prepare the dataset generated from the simulation.
Choose an algorithm from the provided list.
Train the model and evaluate its performance.
Implement incremental learning to further enhance accuracy.
Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue to discuss potential improvements.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgements
Thanks to the communities and resources that provided insights and support throughout the project.
Special thanks to the documentation for the machine learning libraries utilized.