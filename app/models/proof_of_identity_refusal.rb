# frozen_string_literal: true

class ProofOfIdentityRefusal < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :proof_of_identity_types
end
