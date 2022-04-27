# frozen_string_literal: true

# Provides methods for ProofOfIdentityFile
class ProofOfIdentityFileService
  def self.list(filters = {})
    files = []
    if filters[:user_id].present?
      files = ProofOfIdentityFile.where(user_id: filters[:user_id])
    end
    files
  end
end
