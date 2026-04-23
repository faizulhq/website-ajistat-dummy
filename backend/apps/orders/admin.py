# from django.contrib import admin
# from .models import Order, OrderItem, Cart, CartItem

# class OrderItemInline(admin.TabularInline):
#     model = OrderItem
#     extra = 0
#     readonly_fields = ('program', 'program_title', 'price_at_purchase')

# @admin.register(Order)
# class OrderAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'total_price', 'status', 'created_at')
#     list_filter = ('status', 'created_at')
#     search_fields = ('user__name', 'user__email', 'notes')
#     ordering = ('-created_at',)
#     inlines = [OrderItemInline]
#     
#     # Kustomisasi panel untuk menandai dibayar
#     actions = ['mark_as_paid', 'mark_as_cancelled']

#     def mark_as_paid(self, request, queryset):
#         # Update semua order menjadi paid
#         queryset.update(status='paid')
#     mark_as_paid.short_description = "Tandai order terpilih sebagai 'Sudah Dibayar'"
#     
#     def mark_as_cancelled(self, request, queryset):
#         queryset.update(status='cancelled')
#     mark_as_cancelled.short_description = "Batalkan order terpilih"

# class CartItemInline(admin.TabularInline):
#     model = CartItem
#     extra = 0
#     readonly_fields = ('program', 'added_at')

# @admin.register(Cart)
# class CartAdmin(admin.ModelAdmin):
#     list_display = ('id', 'user', 'item_count', 'total', 'updated_at')
#     search_fields = ('user__name', 'user__email')
#     ordering = ('-updated_at',)
#     inlines = [CartItemInline]

