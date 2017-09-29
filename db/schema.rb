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

ActiveRecord::Schema.define(version: 20170927005821) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "entries", id: :bigserial, force: :cascade do |t|
    t.bigint   "trip_id",                                                   null: false
    t.datetime "device_time",                                               null: false
    t.decimal  "latitude",         precision: 10, scale: 8
    t.decimal  "longitude",        precision: 10, scale: 8
    t.decimal  "gps_speed",        precision: 5,  scale: 2
    t.decimal  "altitude",         precision: 5,  scale: 1
    t.decimal  "rpm",              precision: 7,  scale: 2
    t.decimal  "kml",              precision: 4,  scale: 2
    t.integer  "speed"
    t.datetime "created_at",                                                null: false
    t.datetime "updated_at",                                                null: false
    t.decimal  "throttle_percent", precision: 5,  scale: 2, default: "0.0"
    t.decimal  "instant_kml",      precision: 3,  scale: 1
    t.decimal  "fuel_flow",        precision: 7,  scale: 1
    t.decimal  "fuel_used",        precision: 5,  scale: 1
    t.index ["trip_id"], name: "index_entries_on_trip_id", using: :btree
  end

  create_table "landmarks", force: :cascade do |t|
    t.string   "name",                                                           null: false
    t.text     "description"
    t.boolean  "notify",                                         default: false, null: false
    t.geometry "location",    limit: {:srid=>0, :type=>"point"},                 null: false
    t.string   "color",                                                          null: false
    t.datetime "created_at",                                                     null: false
    t.datetime "updated_at",                                                     null: false
  end

  create_table "refuelings", force: :cascade do |t|
    t.integer  "vehicle_id",                          null: false
    t.datetime "date",                                null: false
    t.decimal  "liter_price", precision: 5, scale: 3
    t.decimal  "liters",      precision: 5, scale: 3
    t.decimal  "total_cost",  precision: 7, scale: 3
    t.decimal  "odometer",    precision: 5, scale: 1
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["vehicle_id"], name: "index_refuelings_on_vehicle_id", using: :btree
  end

  create_table "trips", id: :bigserial, force: :cascade do |t|
    t.datetime "start_time",                            null: false
    t.float    "distance"
    t.integer  "average_speed"
    t.integer  "max_speed"
    t.float    "economy"
    t.bigint   "vehicle_id",                            null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.time     "duration"
    t.decimal  "fuel_used",     precision: 5, scale: 1
    t.bigint   "timestamp_ms",                          null: false
    t.index ["vehicle_id", "timestamp_ms"], name: "index_trips_on_vehicle_id_and_timestamp_ms", unique: true, using: :btree
    t.index ["vehicle_id"], name: "index_trips_on_vehicle_id", using: :btree
  end

  create_table "users", id: :bigserial, force: :cascade do |t|
    t.string   "email",                        null: false
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "password_digest", default: "", null: false
    t.integer  "sign_in_count",   default: 0,  null: false
    t.datetime "last_sign_in_at"
    t.string   "last_sign_in_ip"
    t.string   "name",                         null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
  end

  create_table "vehicles", id: :bigserial, force: :cascade do |t|
    t.string   "name",                                                  null: false
    t.string   "torque_id",                                             null: false
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.decimal  "gear_ratios",                           default: [],                 array: true
    t.decimal  "final_drive",   precision: 4, scale: 2, default: "1.0"
    t.decimal  "tire_diameter", precision: 8, scale: 4, default: "1.0"
  end

  add_foreign_key "entries", "trips"
  add_foreign_key "refuelings", "vehicles"
  add_foreign_key "trips", "vehicles"
end
