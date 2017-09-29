# == Schema Information
#
# Table name: users
#
#  created_at      :datetime         not null
#  email           :string           not null
#  id              :integer          not null, primary key
#  last_sign_in_at :datetime
#  last_sign_in_ip :string
#  name            :string           not null
#  password_digest :string           default(""), not null
#  sign_in_count   :integer          default(0), not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#

class User < ApplicationRecord
  has_secure_password
  validates :name, presence: true
end
