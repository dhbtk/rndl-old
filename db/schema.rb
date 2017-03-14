# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170314232313) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "entries", force: :cascade do |t|
    t.bigint "trip_id", null: false
    t.datetime "device_time", null: false
    t.decimal "latitude", precision: 10, scale: 8
    t.decimal "longitude", precision: 10, scale: 8
    t.decimal "gps_speed", precision: 5, scale: 2
    t.decimal "altitude", precision: 5, scale: 1
    t.decimal "rpm", precision: 7, scale: 2
    t.decimal "kml", precision: 4, scale: 2
    t.integer "speed"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "throttle_percent", precision: 5, scale: 2, default: "0.0"
    t.decimal "instant_kml", precision: 3, scale: 1
    t.decimal "fuel_flow", precision: 7, scale: 1
    t.decimal "fuel_used", precision: 5, scale: 1
    t.index ["trip_id"], name: "index_entries_on_trip_id"
  end

  create_table "spatial_ref_sys", primary_key: "srid", id: :integer, default: nil, force: :cascade do |t|
    t.string "auth_name", limit: 256
    t.integer "auth_srid"
    t.string "srtext", limit: 2048
    t.string "proj4text", limit: 2048
  end

  create_table "trips", force: :cascade do |t|
    t.datetime "start_time", null: false
    t.float "distance"
    t.integer "average_speed"
    t.integer "max_speed"
    t.float "economy"
    t.bigint "vehicle_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.time "duration"
    t.decimal "fuel_used", precision: 5, scale: 1
    t.bigint "timestamp_ms", null: false
    t.index ["vehicle_id", "timestamp_ms"], name: "index_trips_on_vehicle_id_and_timestamp_ms", unique: true
    t.index ["vehicle_id"], name: "index_trips_on_vehicle_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.integer "role", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "name", null: false
    t.json "tokens"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "vehicles", force: :cascade do |t|
    t.string "name", null: false
    t.string "torque_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "entries", "trips"
  add_foreign_key "trips", "vehicles"
end
