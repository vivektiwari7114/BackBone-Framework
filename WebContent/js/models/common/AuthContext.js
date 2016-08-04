
// Filename: AuthContext.js
// The authentication context 
define(

	function() {	
		
		var AuthContext = function() {
			this.teamMemberId = "";
			this.storeId = "";
		};
		
		
		AuthContext.prototype.setTeamMemberId = function(teamMemberId) {
			this.teamMemberId = teamMemberId;
		};
		
		AuthContext.prototype.setStoreId = function(storeId) {
			this.storeId = storeId;
		};
		
		AuthContext.prototype.getStoreId = function() {
			return this.storeId;
		};
		
		return AuthContext;
	}
);
