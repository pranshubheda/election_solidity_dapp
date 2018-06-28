var Election = angular.module('election', []);


Election.controller('electionController', function($scope) {
    
    $scope.electionName = "";
    $scope.contestantName = "";
    $scope.authorizeAddress = "";
    $scope.contestantName = "";
    
    if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
    } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    web3.eth.defaultAccount = web3.eth.accounts[0];

    var contract = web3.eth.contract([
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_candidateName",
                    "type": "string"
                }
            ],
            "name": "addCandidate",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "person",
                    "type": "address"
                }
            ],
            "name": "authorize",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_candidate_id",
                    "type": "uint256"
                }
            ],
            "name": "castVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "end",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "getFinalResult",
            "outputs": [
                {
                    "components": [
                        {
                            "name": "candidateName",
                            "type": "string"
                        },
                        {
                            "name": "voteCount",
                            "type": "uint256"
                        }
                    ],
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_election_name",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidates",
            "outputs": [
                {
                    "name": "name",
                    "type": "string"
                },
                {
                    "name": "voteCount",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "electionName",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "finalResult",
            "outputs": [
                {
                    "name": "candidateName",
                    "type": "string"
                },
                {
                    "name": "voteCount",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalVotes",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voters",
            "outputs": [
                {
                    "name": "authorized",
                    "type": "bool"
                },
                {
                    "name": "voted",
                    "type": "bool"
                },
                {
                    "name": "vote",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ]);


    var electionContract = contract.at('0xd99c61e4836220a98a26e61d25934376daaec766');

    console.log(electionContract);

    var finalResult = electionContract.finalResult.getData(0);

    console.log(finalResult);

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"], //candidates
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],//no of votes
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

 });