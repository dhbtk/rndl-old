class RemoveDeviseFromUsers < ActiveRecord::Migration[5.0]
  def up
    change_table :users do |t|
      remove_column :users, :current_sign_in_at
      remove_column :users, :current_sign_in_ip
      remove_column :users, :provider, cascade: true
      remove_column :users, :remember_created_at
      remove_column :users, :reset_password_sent_at
      remove_column :users, :reset_password_token, cascade: true
      remove_column :users, :role
      remove_column :users, :tokens
      remove_column :users, :uid
      rename_column :users, :encrypted_password, :password_digest
    end
  end
end
