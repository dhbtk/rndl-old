class Page
  attr_accessor :total_pages, :total_count, :page, :content
  include ActiveModel::Serialization
  def initialize(relation, total_pages = relation.total_pages, total_count = relation.total_count, page = relation.current_page)
    @total_pages = total_pages
    @total_count = total_count
    @page = page
    @content = relation
  end
end