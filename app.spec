# -*- mode: python ; coding: utf-8 -*-

block_cipher = None


a = Analysis(['django_app/manage.py'],
             binaries=[],
             datas=[
                 ('django_app/main/templatetags', 'main/templatetags'),
                 ('django_app/main/TEMPLATES', 'main/TEMPLATES'),
                 ('django_app/main/static', 'main/static'),
             ],
             hiddenimports=[
                 'main.apps',
                 'main.urls',
                 'main.context_processors',
                 'main.admin',
             ],
             hookspath=[],
             runtime_hooks=[],
             excludes=[],
             win_no_prefer_redirects=False,
             win_private_assemblies=False,
             cipher=block_cipher,
             noarchive=False)
pyz = PYZ(a.pure, a.zipped_data,
             cipher=block_cipher)
exe = EXE(pyz,
          a.scripts,
          [],
          exclude_binaries=True,
          name='server',
          debug=False,
          bootloader_ignore_signals=False,
          strip=False,
          upx=True,
          console=True )
coll = COLLECT(exe,
               a.binaries,
               a.zipfiles,
               a.datas,
               strip=False,
               upx=True,
               name='server_app')