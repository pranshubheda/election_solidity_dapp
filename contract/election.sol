pragma solidity ^0.4.21;

contract Election {
    
    struct Candidate {
        string name;
        uint voteCount;
    }
    
    struct Voter {
        bool authorized;
        bool voted;
        uint vote;
    }
    
    address public owner;
    string public electionName;
        
    struct ElectionResult{
     string candidateName;
     uint voteCount   ;
    }
    
    ElectionResult[] public finalResult;
    
    mapping(address => Voter) public voters;
    Candidate[] public candidates;
    uint public totalVotes;
    
    modifier ownerOnly(){
        require(msg.sender == owner);
        _;
    }
    
    function Election (string _election_name) public{
        owner = msg.sender;
        electionName = _election_name;
    }
    
    function addCandidate(string _candidateName) ownerOnly public{
        candidates.push(Candidate(_candidateName, 0));
    }
    
    function authorize(address person) ownerOnly public{
        voters[person].authorized = true;
    }
    
    function castVote(uint _candidate_id) public{
        //the person voting has to be authorized and should not have already voted
        require(voters[msg.sender].authorized);
        require(!voters[msg.sender].voted);
        
        //store the voters chosen _candidate_id
        //set voted flag so that the voter cannot vote again
        voters[msg.sender].vote = _candidate_id;
        voters[msg.sender].voted = true;
        
        //increment the vote count of the respective candidate
        candidates[_candidate_id].voteCount += 1;
        totalVotes += 1;
    }
    
    function end() ownerOnly public {
        //candidate vote results
        for(uint i=0; i < candidates.length; i++) {
            finalResult.push(ElectionResult(candidates[i].name, candidates[i].voteCount));
        }

        //destroy the contract
        //selfdestruct(owner);
    }
    
}