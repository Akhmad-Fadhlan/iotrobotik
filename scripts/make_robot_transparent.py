import os
from PIL import Image

def make_transparent():
    image_path = os.path.join('public', 'robot_character.png')
    if not os.path.exists(image_path):
        print(f'Error: {image_path} not found.')
        return
        
    print(f'Opening image {image_path}...')
    img = Image.open(image_path).convert('RGBA')
    datas = img.getdata()
    
    # The background is a solid blue. Let's sample the top-left pixel
    bg_color = datas[0]
    print(f'Detected background color: RGB={bg_color[:3]}')
    
    new_data = []
    for item in datas:
        # Calculate Euclidean distance in RGB space to the background color
        dist = ((item[0] - bg_color[0]) ** 2 + 
                (item[1] - bg_color[1]) ** 2 + 
                (item[2] - bg_color[2]) ** 2) ** 0.5
        
        # If the pixel is very close to the background color, make it transparent
        if dist < 45:
            new_data.append((255, 255, 255, 0)) # transparent
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(image_path, 'PNG')
    print(f'Successfully made robot character transparent and saved to {image_path}!')

if __name__ == '__main__':
    make_transparent()
