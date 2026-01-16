<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Ensure storage directories exist
        if (!File::exists(storage_path('app/public/products'))) {
            File::makeDirectory(storage_path('app/public/products'), 0755, true);
        }

        // Create admin user (only if doesn't exist)
        User::firstOrCreate(
            ['email' => 'admin@vibe.com'],
            [
                'name' => 'Admin',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ]
        );

        // Create categories (only if they don't exist)
        $hoodies = Category::firstOrCreate(
            ['slug' => 'hoodies'],
            [
                'name' => 'Hoodies',
                'description' => 'Premium quality hoodies for all seasons',
                'image' => 'products/hoodie-black.png',
                'is_active' => true,
            ]
        );

        $tshirts = Category::firstOrCreate(
            ['slug' => 't-shirts'],
            [
                'name' => 'T-Shirts',
                'description' => 'Comfortable and stylish t-shirts',
                'image' => 'products/tshirt-graphic.png',
                'is_active' => true,
            ]
        );

        $jackets = Category::firstOrCreate(
            ['slug' => 'jackets'],
            [
                'name' => 'Jackets',
                'description' => 'Premium urban jackets and outerwear',
                'is_active' => true,
            ]
        );

        // ...

        // Product 5: Jacket (was Pants)
        $product5 = Product::firstOrCreate(
            ['slug' => 'urban-varsity-jacket'],
            [
                'category_id' => $jackets->id,
                'name' => 'Urban Varsity Jacket',
                'description' => 'Classic varsity jacket with a modern twist. Premium wool blend body and faux leather sleeves.',
                'price' => 8500,
                'is_active' => true,
                'is_featured' => false,
            ]
        );

        // No image for jackets yet, or reuse hoodie as placeholder
        ProductImage::firstOrCreate(
            ['product_id' => $product5->id, 'is_primary' => true],
            [
                'path' => 'products/hoodie-black.png', // Placeholder
                'sort_order' => 0,
            ]
        );

        foreach (['S', 'M', 'L', 'XL'] as $size) {
            ProductVariant::firstOrCreate(
                ['sku' => "UVJ-{$size}-BK"],
                [
                    'product_id' => $product5->id,
                    'size' => $size,
                    'color' => 'Black',
                    'stock_quantity' => rand(5, 15),
                    'price_adjustment' => 0,
                ]
            );
        }
    }
}
